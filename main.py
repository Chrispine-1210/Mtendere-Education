"""
Mtendere Education Consult - Admin Interface
FastAPI application with comprehensive admin functionality
"""

from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi_amis_admin.admin import Settings, AdminApp
from contextlib import asynccontextmanager
import uvicorn
import os

from database import engine, create_tables
from models import *
from middleware import LoggingMiddleware, AnalyticsMiddleware
from auth import get_current_admin_user, ensure_admin_exists
from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_tables()
    ensure_admin_exists()
    yield
    # Shutdown


# Create FastAPI app
app = FastAPI(
    title="Mtendere Education Consult - Admin Interface",
    description="Professional admin interface for managing educational content and applications",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom middleware
app.add_middleware(LoggingMiddleware)
app.add_middleware(AnalyticsMiddleware)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")



from fastapi.responses import RedirectResponse

@app.get("/", include_in_schema=False)
async def root():
    """Redirect to admin interface"""
    return RedirectResponse(url="/admin")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Mtendere Education Admin"}

@app.get("/analytics")
async def analytics_dashboard(request: Request):
    """Custom analytics dashboard - public access for demo"""
    from sqlalchemy import func
    from database import get_db
    
    db = next(get_db())
    
    try:
        # Get analytics data
        total_visitors = db.query(VisitorLog).count()
        unique_visitors = db.query(func.count(func.distinct(VisitorLog.ip_address))).scalar() or 0
        total_applications = db.query(Application).count()
        pending_applications = db.query(Application).filter(Application.status == "pending").count()
        approved_applications = db.query(Application).filter(Application.status == "approved").count()
        
        # Blog stats
        total_posts = db.query(BlogPost).count()
        published_posts = db.query(BlogPost).filter(BlogPost.is_published == True).count()
        
        # Team and testimonial stats
        total_team_members = db.query(TeamMember).count()
        total_testimonials = db.query(Testimonial).count()
        active_testimonials = db.query(Testimonial).filter(Testimonial.is_active == True).count()
        
        # Scholarship stats
        total_scholarships = db.query(Scholarship).count()
        active_scholarships = db.query(Scholarship).filter(Scholarship.is_active == True).count()
        
        analytics_data = {
            "visitors": {
                "total": total_visitors,
                "unique": unique_visitors
            },
            "applications": {
                "total": total_applications,
                "pending": pending_applications,
                "approved": approved_applications
            },
            "content": {
                "blog_posts": {"total": total_posts, "published": published_posts},
                "team_members": total_team_members,
                "testimonials": {"total": total_testimonials, "active": active_testimonials},
                "scholarships": {"total": total_scholarships, "active": active_scholarships}
            }
        }
        
        return templates.TemplateResponse(
            "analytics.html",
            {"request": request, "analytics": analytics_data}
        )
    finally:
        db.close()

# Basic CRUD endpoints for admin functionality
@app.get("/api/users")
async def get_users():
    """Get all users"""
    from database import get_db
    db = next(get_db())
    try:
        users = db.query(User).all()
        return [{"id": u.id, "email": u.email, "full_name": u.full_name, "role": u.role, "is_active": u.is_active} for u in users]
    finally:
        db.close()

@app.get("/api/applications")
async def get_applications():
    """Get all applications"""
    from database import get_db
    db = next(get_db())
    try:
        applications = db.query(Application).all()
        return [{"id": a.id, "full_name": a.full_name, "email": a.email, "status": a.status, "created_at": a.created_at} for a in applications]
    finally:
        db.close()

@app.get("/api/blog-posts")
async def get_blog_posts():
    """Get all blog posts"""
    from database import get_db
    db = next(get_db())
    try:
        posts = db.query(BlogPost).all()
        return [{"id": p.id, "title": p.title, "slug": p.slug, "content": p.content, "is_published": p.is_published, "created_at": p.created_at} for p in posts]
    finally:
        db.close()

@app.post("/api/blog-posts")
async def create_blog_post(post_data: dict):
    """Create a new blog post"""
    from database import get_db
    db = next(get_db())
    try:
        new_post = BlogPost(
            title=post_data["title"],
            slug=post_data["title"].lower().replace(" ", "-"),
            content=post_data["content"],
            excerpt=post_data.get("excerpt", ""),
            is_published=post_data.get("is_published", False),
            author_id=1  # Default admin user
        )
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return {"message": "Blog post created successfully", "id": new_post.id}
    finally:
        db.close()

@app.put("/api/blog-posts/{post_id}")
async def update_blog_post(post_id: int, post_data: dict):
    """Update a blog post"""
    from database import get_db
    db = next(get_db())
    try:
        post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
        if not post:
            return {"error": "Blog post not found"}
        
        post.title = post_data["title"]
        post.content = post_data["content"]
        post.excerpt = post_data.get("excerpt", post.excerpt)
        post.is_published = post_data.get("is_published", post.is_published)
        db.commit()
        return {"message": "Blog post updated successfully"}
    finally:
        db.close()

@app.delete("/api/blog-posts/{post_id}")
async def delete_blog_post(post_id: int):
    """Delete a blog post"""
    from database import get_db
    db = next(get_db())
    try:
        post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
        if not post:
            return {"error": "Blog post not found"}
        
        db.delete(post)
        db.commit()
        return {"message": "Blog post deleted successfully"}
    finally:
        db.close()

# Testimonials API
@app.get("/api/testimonials")
async def get_testimonials():
    """Get all testimonials"""
    from database import get_db
    db = next(get_db())
    try:
        testimonials = db.query(Testimonial).all()
        return [{"id": t.id, "name": t.name, "role": t.role, "company": t.company, "content": t.content, "rating": t.rating, "is_active": t.is_active} for t in testimonials]
    finally:
        db.close()

@app.post("/api/testimonials")
async def create_testimonial(testimonial_data: dict):
    """Create a new testimonial"""
    from database import get_db
    db = next(get_db())
    try:
        new_testimonial = Testimonial(
            name=testimonial_data["name"],
            role=testimonial_data["role"],
            company=testimonial_data.get("company", ""),
            content=testimonial_data["content"],
            rating=testimonial_data["rating"],
            is_active=testimonial_data.get("is_active", True)
        )
        db.add(new_testimonial)
        db.commit()
        db.refresh(new_testimonial)
        return {"message": "Testimonial created successfully", "id": new_testimonial.id}
    finally:
        db.close()

@app.put("/api/testimonials/{testimonial_id}")
async def update_testimonial(testimonial_id: int, testimonial_data: dict):
    """Update a testimonial"""
    from database import get_db
    db = next(get_db())
    try:
        testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
        if not testimonial:
            return {"error": "Testimonial not found"}
        
        testimonial.name = testimonial_data["name"]
        testimonial.role = testimonial_data["role"]
        testimonial.company = testimonial_data.get("company", testimonial.company)
        testimonial.content = testimonial_data["content"]
        testimonial.rating = testimonial_data["rating"]
        testimonial.is_active = testimonial_data.get("is_active", testimonial.is_active)
        db.commit()
        return {"message": "Testimonial updated successfully"}
    finally:
        db.close()

@app.delete("/api/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: int):
    """Delete a testimonial"""
    from database import get_db
    db = next(get_db())
    try:
        testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
        if not testimonial:
            return {"error": "Testimonial not found"}
        
        db.delete(testimonial)
        db.commit()
        return {"message": "Testimonial deleted successfully"}
    finally:
        db.close()

# Team Members API  
@app.get("/api/team-members")
async def get_team_members():
    """Get all team members"""
    from database import get_db
    db = next(get_db())
    try:
        members = db.query(TeamMember).all()
        return [{"id": m.id, "name": m.name, "position": m.position, "bio": m.bio, "email": m.email, "is_active": m.is_active} for m in members]
    finally:
        db.close()

@app.post("/api/team-members")
async def create_team_member(member_data: dict):
    """Create a new team member"""
    from database import get_db
    db = next(get_db())
    try:
        new_member = TeamMember(
            name=member_data["name"],
            position=member_data["position"],
            bio=member_data.get("bio", ""),
            email=member_data.get("email", ""),
            is_active=member_data.get("is_active", True)
        )
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        return {"message": "Team member created successfully", "id": new_member.id}
    finally:
        db.close()

@app.put("/api/team-members/{member_id}")
async def update_team_member(member_id: int, member_data: dict):
    """Update a team member"""
    from database import get_db
    db = next(get_db())
    try:
        member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
        if not member:
            return {"error": "Team member not found"}
        
        member.name = member_data["name"]
        member.position = member_data["position"]
        member.bio = member_data.get("bio", member.bio)
        member.email = member_data.get("email", member.email)
        member.is_active = member_data.get("is_active", member.is_active)
        db.commit()
        return {"message": "Team member updated successfully"}
    finally:
        db.close()

@app.delete("/api/team-members/{member_id}")
async def delete_team_member(member_id: int):
    """Delete a team member"""
    from database import get_db
    db = next(get_db())
    try:
        member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
        if not member:
            return {"error": "Team member not found"}
        
        db.delete(member)
        db.commit()
        return {"message": "Team member deleted successfully"}
    finally:
        db.close()

# Scholarships API
@app.get("/api/scholarships")
async def get_scholarships():
    """Get all scholarships"""
    from database import get_db
    db = next(get_db())
    try:
        scholarships = db.query(Scholarship).all()
        return [{"id": s.id, "title": s.title, "description": s.description, "amount": s.amount, "deadline": s.deadline, "country": s.country, "is_active": s.is_active} for s in scholarships]
    finally:
        db.close()

@app.post("/api/scholarships")
async def create_scholarship(scholarship_data: dict):
    """Create a new scholarship"""
    from database import get_db
    from datetime import datetime
    db = next(get_db())
    try:
        deadline = None
        if scholarship_data.get("deadline"):
            deadline = datetime.fromisoformat(scholarship_data["deadline"])
            
        new_scholarship = Scholarship(
            title=scholarship_data["title"],
            description=scholarship_data["description"],
            eligibility_criteria=scholarship_data.get("eligibility_criteria", ""),
            amount=float(scholarship_data["amount"]) if scholarship_data.get("amount") else None,
            deadline=deadline,
            country=scholarship_data.get("country", ""),
            field_of_study=scholarship_data.get("field_of_study", ""),
            is_active=scholarship_data.get("is_active", True)
        )
        db.add(new_scholarship)
        db.commit()
        db.refresh(new_scholarship)
        return {"message": "Scholarship created successfully", "id": new_scholarship.id}
    finally:
        db.close()

@app.put("/api/scholarships/{scholarship_id}")
async def update_scholarship(scholarship_id: int, scholarship_data: dict):
    """Update a scholarship"""
    from database import get_db
    from datetime import datetime
    db = next(get_db())
    try:
        scholarship = db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
        if not scholarship:
            return {"error": "Scholarship not found"}
        
        deadline = None
        if scholarship_data.get("deadline"):
            deadline = datetime.fromisoformat(scholarship_data["deadline"])
            
        scholarship.title = scholarship_data["title"]
        scholarship.description = scholarship_data["description"]
        scholarship.eligibility_criteria = scholarship_data.get("eligibility_criteria", scholarship.eligibility_criteria)
        scholarship.amount = float(scholarship_data["amount"]) if scholarship_data.get("amount") else scholarship.amount
        scholarship.deadline = deadline
        scholarship.country = scholarship_data.get("country", scholarship.country)
        scholarship.field_of_study = scholarship_data.get("field_of_study", scholarship.field_of_study)
        scholarship.is_active = scholarship_data.get("is_active", scholarship.is_active)
        db.commit()
        return {"message": "Scholarship updated successfully"}
    finally:
        db.close()

@app.delete("/api/scholarships/{scholarship_id}")
async def delete_scholarship(scholarship_id: int):
    """Delete a scholarship"""
    from database import get_db
    db = next(get_db())
    try:
        scholarship = db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
        if not scholarship:
            return {"error": "Scholarship not found"}
        
        db.delete(scholarship)
        db.commit()
        return {"message": "Scholarship deleted successfully"}
    finally:
        db.close()

# Application status update API
@app.put("/api/applications/{application_id}")
async def update_application_status(application_id: int, update_data: dict):
    """Update application status"""
    from database import get_db
    db = next(get_db())
    try:
        application = db.query(Application).filter(Application.id == application_id).first()
        if not application:
            return {"error": "Application not found"}
        
        application.status = update_data["status"]
        application.admin_notes = update_data.get("admin_notes", application.admin_notes)
        db.commit()
        return {"message": "Application status updated successfully"}
    finally:
        db.close()

# Create a simple admin dashboard instead of fastapi-amis-admin
@app.get("/admin")
async def admin_dashboard(request: Request):
    """Complete admin dashboard with full CRUD functionality"""
    return templates.TemplateResponse(
        "admin_dashboard_new.html",
        {"request": request}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5000,
        reload=True
    )
