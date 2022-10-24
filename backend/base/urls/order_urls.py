
from django.contrib import admin
from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='get-orders'),
    path('add/', views.addOrderItems, name='add-orders'),
    path('user/', views.getMyOrders, name='get-my-orders'),
    path('<str:pk>/', views.getOrderById, name='get-order'),
    path('paid/<str:pk>/', views.updateOrderToPaid, name='paid-order'),
    path('delivered/<str:pk>/', views.updateOrderToDelivered, name='delivered-order'),
    path('cancel/<str:pk>/', views.cancelOrder, name='cancel-order'),
    
]
