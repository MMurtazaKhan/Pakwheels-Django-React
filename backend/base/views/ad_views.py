from ast import Return
from unicodedata import category
from base.serializers import *
from base.models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addAd(request):
    user = request.user
    data = request.data 

    ad = Ad.objects.create(
        # user = user,
        # name = data['name'],
        # image = data['image'],
        # model = data['model'], 
        # make = data['make'],
        # category = data['category'],
        # description = data['description'],
        # price = data['price']
        
        user = user,
        name = 'sample',
        image = '',
        model = 2000, 
        make = 'sample make',
        category = 'category',
        description = '',
        price = 100

    )

    serializer = AdSerializer(ad, many = False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createAd(request):
    user = request.user
    data = request.data 

    ad = Ad.objects.create(
        user = user,
        name = data['name'],
        image = request.FILES.get('image'),
        model = data['model'], 
        make = data['make'],
        category = data['category'],
        description = data['description'],
        price = data['price']
        
    )

    serializer = AdSerializer(ad, many = False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data 

    product_id = data['product_id']
    product = Product.objects.get(_id = product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image uploaded')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def UpdateAd(request, pk):
    
    ad = Ad.objects.get(_id = pk)
    data = request.data 

    ad.name = data['name']
    ad.image = data['image']
    ad.model = data['model'] 
    ad.make = data['make']
    ad.category = data['category']
    ad.description = data['description']
    ad.price = data['price']

    ad.save()

    serializer = AdSerializer(ad, many=False)
    return  Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAd(request, pk):
    ad = Ad.objects.get(_id = pk)
    ad.delete()
    return Response('Ad deleted')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserAds(request):
    user = request.user
    ads = user.ad_set.all()
    serializer = AdSerializer(ads, many = True)
    return Response(serializer.data)


@api_view(['GET'])
def getAllAds(request):
    ads = Ad.objects.all()
    serializer = AdSerializer(ads, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getAdById(request, pk):
    ads = Ad.objects.get(_id = pk)
    serializer = AdSerializer(ads, many = False)
    return Response(serializer.data)