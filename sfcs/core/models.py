from django.conf import settings
from django.db import models
from django.shortcuts import reverse

CATEGORY_CHOICES = {
    ('F', 'Food'),
    ('S', 'Soup'),
    ('D', 'Drink')
}

class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=1)
    slug = models.SlugField()
    description = models.TextField()


    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:product", kwargs={
            'slug': self.slug
        })

    def get_add_to_cart_url(self):
        return reverse("core:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_from_cart_url(self):
        return reverse("core:remove-from-cart", kwargs={
            'slug': self.slug
        })

class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                            on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)   
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.name}"
    
    def get_total_item_price(self):
        return self.quantity * self.item.price

    def item_pay_success(self):
        setattr(self, "ordered", True)
        self.save()

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                            on_delete=models.CASCADE)

    ordered = models.BooleanField(default=False)    
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateField(auto_now_add=True)

    price = models.FloatField(null=True)

    def __str__(self):
        return self.user.username

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_item_price()
        
        return total

    def order_pay_success(self):
        for order_item in self.items.all():
            order_item.item_pay_success()

        setattr(self, "ordered", True)
        self.save()
    