# Generated by Django 3.0.7 on 2020-07-08 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('D', 'Drink'), ('F', 'Food'), ('S', 'Soup')], default='D', max_length=1),
            preserve_default=False,
        ),
    ]
