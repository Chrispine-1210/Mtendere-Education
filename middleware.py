"""
Custom middleware for logging and analytics
"""

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
import time
from datetime import datetime
import json

from database import get_db_session
from models import VisitorLog


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware for logging requests and responses"""
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Get client information
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        referrer = request.headers.get("referer", "")
        
        # Process request
        response = await call_next(request)
        
        # Calculate response time
        process_time = time.time() - start_time
        
        # Log the request (skip admin static files and health checks)
        if not request.url.path.startswith(("/admin/static", "/static", "/health")):
            await self.log_request(
                ip_address=client_ip,
                user_agent=user_agent,
                endpoint=request.url.path,
                method=request.method,
                status_code=response.status_code,
                response_time=process_time,
                referrer=referrer
            )
        
        # Add response time header
        response.headers["X-Process-Time"] = str(process_time)
        
        return response
    
    async def log_request(self, **kwargs):
        """Log request to database"""
        try:
            db = get_db_session()
            visitor_log = VisitorLog(**kwargs)
            db.add(visitor_log)
            db.commit()
            db.close()
        except Exception as e:
            print(f"Failed to log request: {e}")


class AnalyticsMiddleware(BaseHTTPMiddleware):
    """Middleware for analytics tracking"""
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.request_count = 0
        self.error_count = 0
    
    async def dispatch(self, request: Request, call_next):
        # Increment request counter
        self.request_count += 1
        
        # Process request
        response = await call_next(request)
        
        # Track errors
        if response.status_code >= 400:
            self.error_count += 1
        
        # Add analytics headers
        response.headers["X-Request-Count"] = str(self.request_count)
        response.headers["X-Error-Count"] = str(self.error_count)
        
        return response


class SecurityMiddleware(BaseHTTPMiddleware):
    """Middleware for basic security headers"""
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Add security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        return response
