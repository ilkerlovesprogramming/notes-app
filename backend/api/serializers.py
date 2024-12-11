from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =["id" , "username", "password"]
        extra_kwargs = {"password": {"write_only":True}}

    def create(self, validated_data): #data that is present in fields 
        user = User.objects.create_user(**validated_data) #validates the details and creates a new user
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields =["id", "title", "content" ,"author", "created", "updated"]
        extra_kwargs = {"author":{"read_only":True}}

class UpdateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note,
        fields= ["title", "content"]