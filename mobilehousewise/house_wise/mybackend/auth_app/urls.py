from django.contrib import admin  # Add this line
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Now 'admin' is defined
    path('auth/', include('dj_rest_auth.urls')),  # Login/Logout/Password Reset
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Signup
]
