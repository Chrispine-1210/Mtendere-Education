"""
Admin interface setup using fastapi-amis-admin
"""

from fastapi import FastAPI, Request
from fastapi_amis_admin.admin import AdminApp, BaseAdmin
from fastapi_amis_admin.amis import Page
from fastapi_amis_admin.crud import BaseCrud
from sqlalchemy import text
from datetime import datetime
import os

from database import engine
from models import *
from auth import ensure_admin_exists
from email_service import send_notification_email


# Custom CRUD classes with email notifications
class NotificationCrud(BaseCrud):
    """Base CRUD class with email notifications"""
    
    async def create_item(self, request: Request, item: dict, **kwargs):
        """Override create to send notification"""
        result = await super().create_item(request, item, **kwargs)
        await self.send_create_notification(item)
        return result
    
    async def update_item(self, request: Request, item_id: int, item: dict, **kwargs):
        """Override update to send notification"""
        result = await super().update_item(request, item_id, item, **kwargs)
        await self.send_update_notification(item_id, item)
        return result
    
    async def delete_item(self, request: Request, item_id: int, **kwargs):
        """Override delete to send notification"""
        await self.send_delete_notification(item_id)
        return await super().delete_item(request, item_id, **kwargs)
    
    async def send_create_notification(self, item: dict):
        """Send email notification for item creation"""
        model_name = self.model.__name__
        subject = f"New {model_name} Created - Mtendere Education Admin"
        content = f"A new {model_name} has been created in the admin system.\n\nDetails: {item}"
        await send_notification_email(subject, content)
    
    async def send_update_notification(self, item_id: int, item: dict):
        """Send email notification for item update"""
        model_name = self.model.__name__
        subject = f"{model_name} Updated - Mtendere Education Admin"
        content = f"{model_name} #{item_id} has been updated in the admin system.\n\nNew details: {item}"
        await send_notification_email(subject, content)
    
    async def send_delete_notification(self, item_id: int):
        """Send email notification for item deletion"""
        model_name = self.model.__name__
        subject = f"{model_name} Deleted - Mtendere Education Admin"
        content = f"{model_name} #{item_id} has been deleted from the admin system."
        await send_notification_email(subject, content)


# Admin classes for each model
class UserAdmin(BaseAdmin):
    model = User
    crud = NotificationCrud
    page_schema = Page(title="User Management", icon="fa fa-users")
    
    # Customize displayed fields
    list_display = ["id", "email", "full_name", "role", "is_active", "created_at"]
    search_fields = ["email", "full_name"]
    list_filter = ["role", "is_active"]


class BlogPostAdmin(BaseAdmin):
    model = BlogPost
    crud = NotificationCrud
    page_schema = Page(title="Blog Posts", icon="fa fa-newspaper")
    
    list_display = ["id", "title", "is_published", "created_at"]
    search_fields = ["title", "content"]
    list_filter = ["is_published"]


class TestimonialAdmin(BaseAdmin):
    model = Testimonial
    crud = NotificationCrud
    page_schema = Page(title="Testimonials", icon="fa fa-star")
    
    list_display = ["id", "name", "role", "company", "rating", "is_active"]
    search_fields = ["name", "company"]
    list_filter = ["rating", "is_active"]


class TeamMemberAdmin(BaseAdmin):
    model = TeamMember
    crud = NotificationCrud
    page_schema = Page(title="Team Members", icon="fa fa-users")
    
    list_display = ["id", "name", "position", "is_active", "sort_order"]
    search_fields = ["name", "position"]
    list_filter = ["is_active"]


class ScholarshipAdmin(BaseAdmin):
    model = Scholarship
    crud = NotificationCrud
    page_schema = Page(title="Scholarships", icon="fa fa-graduation-cap")
    
    list_display = ["id", "title", "amount", "deadline", "is_active"]
    search_fields = ["title", "country", "field_of_study"]
    list_filter = ["is_active", "country"]


class InsightAdmin(BaseAdmin):
    model = Insight
    crud = NotificationCrud
    page_schema = Page(title="Insights", icon="fa fa-lightbulb")
    
    list_display = ["id", "title", "category", "is_featured", "is_published"]
    search_fields = ["title", "category"]
    list_filter = ["category", "is_featured", "is_published"]


class ApplicationAdmin(BaseAdmin):
    model = Application
    crud = NotificationCrud
    page_schema = Page(title="Applications", icon="fa fa-file-text")
    
    list_display = ["id", "full_name", "email", "field_of_interest", "status", "created_at"]
    search_fields = ["full_name", "email", "field_of_interest"]
    list_filter = ["status", "field_of_interest", "country"]


class VisitorLogAdmin(BaseAdmin):
    model = VisitorLog
    page_schema = Page(title="Visitor Analytics", icon="fa fa-chart-line")
    
    list_display = ["id", "ip_address", "endpoint", "method", "status_code", "timestamp"]
    search_fields = ["ip_address", "endpoint"]
    list_filter = ["method", "status_code"]


class ContactInquiryAdmin(BaseAdmin):
    model = ContactInquiry
    crud = NotificationCrud
    page_schema = Page(title="Contact Inquiries", icon="fa fa-envelope")
    
    list_display = ["id", "name", "email", "subject", "is_resolved", "created_at"]
    search_fields = ["name", "email", "subject"]
    list_filter = ["is_resolved"]


class NewsletterSubscriptionAdmin(BaseAdmin):
    model = NewsletterSubscription
    page_schema = Page(title="Newsletter Subscriptions", icon="fa fa-mail-bulk")
    
    list_display = ["id", "email", "is_active", "subscribed_at"]
    search_fields = ["email"]
    list_filter = ["is_active"]


def setup_admin() -> AdminApp:
    """Setup and configure the admin application"""
    # Ensure admin user exists
    ensure_admin_exists()
    
    # Create admin app with engine
    admin_app = AdminApp(
        settings={
            "database_url": os.getenv("DATABASE_URL", "sqlite:///./mtendere_admin.db"),
            "engine": engine
        }
    )
    
    # Register admin classes
    admin_app.register_admin(UserAdmin)
    admin_app.register_admin(BlogPostAdmin)
    admin_app.register_admin(TestimonialAdmin)
    admin_app.register_admin(TeamMemberAdmin)
    admin_app.register_admin(ScholarshipAdmin)
    admin_app.register_admin(InsightAdmin)
    admin_app.register_admin(ApplicationAdmin)
    admin_app.register_admin(VisitorLogAdmin)
    admin_app.register_admin(ContactInquiryAdmin)
    admin_app.register_admin(NewsletterSubscriptionAdmin)
    
    # Ensure admin user exists
    ensure_admin_exists()
    
    return admin_app
