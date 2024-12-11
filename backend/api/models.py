from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title  = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True) 
    author = models.ForeignKey(User ,on_delete=models.CASCADE, related_name="notes") #one to many relation
    #When the User is deleted models.CASCADE deletes all the data related to the User From the Database.
    #related_names="notes" allows to access all the objects of Note class (ex: notes.title)



    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.title