from django.shortcuts import render 
from django.contrib.auth.models import User
from rest_framework import generics 
from rest_framework.response import Response
from .serializers import UserSerializer ,NoteSerializer ,UpdateNoteSerializer
from rest_framework.permissions import IsAuthenticated , AllowAny
# Create your views here.
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return  Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return  Note.objects.filter(author=user)

class NoteListUpdate(generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = UpdateNoteSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request , *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data = request.data , partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

class CreateUserView(generics.CreateAPIView): #creating a new user
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

