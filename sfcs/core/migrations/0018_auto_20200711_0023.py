# Generated by Django 3.0.7 on 2020-07-10 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_auto_20200710_2235'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='paid',
        ),
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('F', 'Food'), ('S', 'Soup'), ('D', 'Drink')], max_length=1),
        ),
    ]
