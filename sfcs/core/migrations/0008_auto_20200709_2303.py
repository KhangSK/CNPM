# Generated by Django 3.0.7 on 2020-07-09 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20200709_2301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('D', 'Drink'), ('F', 'Food'), ('S', 'Soup')], max_length=1),
        ),
    ]