"""
Database models for Mtendere Education Consult Admin Interface
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum


class ApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    UNDER_REVIEW = "under_review"


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    APPLICANT = "applicant"


# User Models
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: str
    phone: Optional[str] = None
    is_active: bool = Field(default=True)
    role: UserRole = Field(default=UserRole.USER)


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Blog Models
class BlogPostBase(SQLModel):
    title: str = Field(max_length=200)
    slug: str = Field(unique=True, index=True)
    excerpt: Optional[str] = Field(max_length=500)
    content: str
    featured_image_url: Optional[str] = None
    is_published: bool = Field(default=False)
    meta_description: Optional[str] = Field(max_length=160)
    tags: Optional[str] = None  # Comma-separated tags


class BlogPost(BlogPostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    author_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    published_at: Optional[datetime] = None


# Testimonial Models
class TestimonialBase(SQLModel):
    name: str = Field(max_length=100)
    role: str = Field(max_length=100)
    company: Optional[str] = Field(max_length=100)
    content: str = Field(max_length=1000)
    rating: int = Field(ge=1, le=5)
    image_url: Optional[str] = None
    is_active: bool = Field(default=True)


class Testimonial(TestimonialBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Team Models
class TeamMemberBase(SQLModel):
    name: str = Field(max_length=100)
    position: str = Field(max_length=100)
    bio: Optional[str] = Field(max_length=1000)
    image_url: Optional[str] = None
    email: Optional[str] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    is_active: bool = Field(default=True)
    sort_order: int = Field(default=0)


class TeamMember(TeamMemberBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Scholarship Models
class ScholarshipBase(SQLModel):
    title: str = Field(max_length=200)
    description: str
    eligibility_criteria: str
    amount: Optional[float] = None
    deadline: Optional[datetime] = None
    application_url: Optional[str] = None
    is_active: bool = Field(default=True)
    country: Optional[str] = Field(max_length=100)
    field_of_study: Optional[str] = Field(max_length=100)


class Scholarship(ScholarshipBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Insights Models
class InsightBase(SQLModel):
    title: str = Field(max_length=200)
    content: str
    category: str = Field(max_length=100)
    is_featured: bool = Field(default=False)
    is_published: bool = Field(default=False)
    image_url: Optional[str] = None


class Insight(InsightBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    author_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Application Models
class ApplicationBase(SQLModel):
    full_name: str = Field(max_length=100)
    email: str
    phone: str = Field(max_length=20)
    country: str = Field(max_length=100)
    field_of_interest: str = Field(max_length=100)
    education_level: str = Field(max_length=100)
    message: Optional[str] = Field(max_length=2000)
    status: ApplicationStatus = Field(default=ApplicationStatus.PENDING)
    admin_notes: Optional[str] = Field(max_length=1000)


class Application(ApplicationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    reviewed_at: Optional[datetime] = None
    reviewed_by: Optional[int] = Field(foreign_key="user.id")
    



# Analytics Models
class VisitorLogBase(SQLModel):
    ip_address: str = Field(max_length=45)
    user_agent: str = Field(max_length=500)
    endpoint: str = Field(max_length=200)
    method: str = Field(max_length=10)
    status_code: int
    response_time: float
    referrer: Optional[str] = Field(max_length=500)


class VisitorLog(VisitorLogBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[int] = Field(foreign_key="user.id")


# Contact/Inquiry Models
class ContactInquiryBase(SQLModel):
    name: str = Field(max_length=100)
    email: str = Field(max_length=100)
    subject: str = Field(max_length=200)
    message: str = Field(max_length=2000)
    is_resolved: bool = Field(default=False)


class ContactInquiry(ContactInquiryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: Optional[datetime] = None
    resolved_by: Optional[int] = Field(foreign_key="user.id")


# Newsletter Subscription Models
class NewsletterSubscriptionBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = Field(default=True)


class NewsletterSubscription(NewsletterSubscriptionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    unsubscribed_at: Optional[datetime] = None
