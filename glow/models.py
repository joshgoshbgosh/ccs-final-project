from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()



class Patient(models.Model):
    Male = "Male"
    Female = "Female"
    Prefer_Not_To_Say = "Prefer_Not_To_Say"

    GENDER_CHOICES = [
    (Male, "Male"),
    (Female, "Female"),
    ()
    ]


    name = models.CharField(max_length=225)
    date_of_birth = models.DateField(max_length=225)
    weight = models.CharField(max_length=225)
    height = models.CharField(max_length=225)
    gender = models.CharField(max_length=225, choices = GENDER_CHOICES)


class Medication(models.Model):



    def __str__(self):
        return self.title
