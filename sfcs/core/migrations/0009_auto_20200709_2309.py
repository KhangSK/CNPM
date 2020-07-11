# Generated by Django 3.0.7 on 2020-07-09 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20200709_2303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('S', 'Soup'), ('F', 'Food'), ('D', 'Drink')], max_length=1),
        ),
        migrations.AlterField(
            model_name='order',
            name='paid',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
