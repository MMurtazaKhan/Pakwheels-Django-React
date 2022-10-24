
from django.contrib import admin
from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='get-products'),
    path('<str:pk>/', views.getProductById, name='get-product'),
    path('admin/delete/<str:pk>/', views.deleteProduct, name='delete-product'),
    path('admin/add/', views.AddProduct, name='add-product'),
    path('admin/update/<str:pk>/', views.updateProduct, name='update-product'),
]
