
from django.urls import path
from base.views import ad_views as views

urlpatterns = [
    path('', views.getAllAds, name='get-all-ads' ),
    path('add/', views.addAd, name='add-ad' ),
    path('create/', views.createAd, name='create-ad' ),
    path('update/<str:pk>/', views.UpdateAd, name='update-ad' ),
    path('delete/<str:pk>/', views.deleteAd, name='delete-ad' ),
    path('user/', views.getUserAds, name='get-ads' ),
    path('<str:pk>/', views.getAdById, name='get-ad' ),
    path('uploadImage/', views.uploadImage, name='upload-image-ad' ),
    
    ]
