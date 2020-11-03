from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()



class Patient(models.Model):
    Male = "Male"
    Female = "Female"

    GENDER_CHOICES = [
    (Male, "Male"),
    (Female, "Female"),
    ]

    Yes = "Yes"
    No = "No"

    BED_CHOICES = [
    (Yes, "Yes"),
    (No, "No")
    ]


    WALK_CHOICES = [
    (Yes, "Yes"),
    (No, "No")
    ]


    first_name = models.CharField(max_length=225)
    last_name = models.CharField(max_length=225, null=True)
    # upload = models.ImageField(max_length=225, null=True)
    date_of_birth = models.DateField(max_length=225)
    weight = models.CharField(max_length=225)
    height = models.CharField(max_length=225)
    gender = models.CharField(max_length=225, choices = GENDER_CHOICES)
    food_allergies = models.CharField(max_length=225, null=True, blank=True)
    medication_allergies = models.CharField(max_length=225, null=True, blank=True)
    primary_doctor = models.CharField(max_length=225)
    primary_doctor_telephone_number = models.CharField(max_length=225)
    language = models.CharField(max_length=225)
    bed_patient = models.CharField(max_length=225, choices = BED_CHOICES)
    able_to_walk_alone = models.CharField(max_length=225, choices = WALK_CHOICES, default=None)
    walking_devices = models.CharField(max_length=225, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    surgeries = models.TextField(default=None, null=True, blank=True)


    def __str__(self):
        return self.last_name + "," + self.first_name


# class Medication(models.Model):

    # medication_name = CharField(max_length=225)
