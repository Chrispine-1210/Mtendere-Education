"""
Configuration settings for the application
"""

import os
from typing import Optional


class Settings:
    """Application settings"""
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./mtendere_admin.db")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "mtendere-education-secret-key-change-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))  # 24 hours
    
    # Email Configuration
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "mtendereeduconsult@gmail.com")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    
    # Admin Configuration
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "mtendereeduconsult@gmail.com")
    
    # Application Settings
    APP_NAME: str = "Mtendere Education Consult - Admin"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = int(os.getenv("DEFAULT_PAGE_SIZE", "20"))
    MAX_PAGE_SIZE: int = int(os.getenv("MAX_PAGE_SIZE", "100"))
    
    # File Upload
    MAX_FILE_SIZE: int = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
    ALLOWED_FILE_EXTENSIONS: list = ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"]
    
    # Cache Settings
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "300"))  # 5 minutes


# Create settings instance
settings = Settings()


def get_database_url() -> str:
    """Get database URL with fallback logic"""
    # Try PostgreSQL environment variables first
    pg_host = os.getenv("PGHOST")
    pg_database = os.getenv("PGDATABASE")
    pg_user = os.getenv("PGUSER")
    pg_password = os.getenv("PGPASSWORD")
    pg_port = os.getenv("PGPORT", "5432")
    
    if all([pg_host, pg_database, pg_user, pg_password]):
        return f"postgresql://{pg_user}:{pg_password}@{pg_host}:{pg_port}/{pg_database}"
    
    # Fall back to DATABASE_URL or SQLite
    return os.getenv("DATABASE_URL", "sqlite:///./mtendere_admin.db")


def is_production() -> bool:
    """Check if running in production environment"""
    return os.getenv("ENVIRONMENT", "development").lower() == "production"


def get_cors_origins() -> list:
    """Get CORS origins based on environment"""
    if is_production():
        # In production, be more restrictive
        origins = os.getenv("CORS_ORIGINS", "").split(",")
        return [origin.strip() for origin in origins if origin.strip()]
    else:
        # In development, allow localhost
        return ["http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:8000"]
