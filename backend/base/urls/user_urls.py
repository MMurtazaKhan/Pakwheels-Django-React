
from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view() ),
    path('register/', views.registerUser, name='register' ),
    path('profile/', views.getProfile, name='profile' ),
    path('admin/user/update/<str:pk>/', views.updateUser, name='update-user' ),
    path('admin/user/delete/<str:pk>/', views.deleteUser, name='delete-user' ),
    path('admin/getusers/', views.getUsers, name='users' ),
    path('admin/user/<str:pk>/', views.getUserById, name='user' ),
    path('profile/update/', views.updateProfile, name='update-profile' ),
    ]
