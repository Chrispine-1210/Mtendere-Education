"""
Authentication and authorization utilities
"""

from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import os

from database import get_db
from models import User, UserRole
from config import settings

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "mtendere-education-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Security scheme
security = HTTPBearer()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    """Verify JWT token and return payload"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate user with email and password"""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise credentials_exception
    
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    
    return user


def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """Get current user and verify admin role"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions. Admin access required."
        )
    return current_user

def create_admin_user(db: Session, email: str, password: str, full_name: str) -> User:
    """Create an admin user"""
    hashed_password = get_password_hash(password)
    admin_user = User(
        email=email,
        hashed_password=hashed_password,
        full_name=full_name,
        role=UserRole.ADMIN,
        is_active=True
    )
    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)
    return admin_user


def ensure_admin_exists():
    """Ensure at least one admin user exists"""
    from database import get_db_session
    
    db = get_db_session()
    try:
        admin_exists = db.query(User).filter(User.role == UserRole.ADMIN).first()
        if not admin_exists:
            # Create default admin user
            default_admin_email = "admin@mtendereeduconsult.com"
            default_admin_password = "admin123"  # Change this in production
            create_admin_user(
                db=db,
                email=default_admin_email,
                password=default_admin_password,
                full_name="Admin User"
            )
            print(f"Created default admin user: {default_admin_email}")
            print(f"Default password: {default_admin_password}")
            print("Please change the password after first login!")
    finally:
        db.close()
