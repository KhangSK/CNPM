from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, View
from django.utils import timezone
from .models import Item, Order, OrderItem, CATEGORY_CHOICES
from .forms import CheckoutForm

class HomeView(ListView):
    model = Item
    paginate_by = 4
    template_name = 'home.html'
    def get_context_data(self,**kwargs):
        context = super(HomeView,self).get_context_data(**kwargs)
        context['cate'] = CATEGORY_CHOICES
        return context

class ItemDetailView(DetailView):
    model = Item
    template_name = 'product.html'

class CheckoutView(View):
    def get(self, *args, **kwargs):
        # form
        form = CheckoutForm()
        # order
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {
                'form' : form,
                'order': order
            }
            return render(self.request, 'checkout.html', context)

        except ObjectDoesNotExist:
            messages.error(self.request, "You dont have an active order")
            return render(self.request, 'order_summary.html')
    
    def post(self, *arg, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            form = CheckoutForm(self.request.POST or None)
            if form.is_valid():
                payment_method = form.cleaned_data.get("payment_option")
                if payment_method == 'A':
                    print("user pay")
                    order.order_pay_success()
                    return redirect("core:home") 
                else:
                    print("not user pay")
                    return redirect("core:home") 

            messages.warning(self.request, "Fail to checkout")
            return redirect("core:checkout")                    

        except ObjectDoesNotExist:
            messages.error(self.request, "You no have an active order")
            return redirect("/")
        




class OrderSummaryView(LoginRequiredMixin, View):
    def get(self, *arg, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {
                'object': order
            }
            return render(self.request, 'order_summary.html', context)

        except ObjectDoesNotExist:
            messages.error(self.request, "You dont have an active order")
            return render(self.request, 'order_summary.html')


@login_required
def add_to_cart(request, slug):
    item = get_object_or_404(Item, slug=slug)
    order_item, create = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered = False) 
    if order_qs.exists():
        order = order_qs[0]
        #check if the item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "This item's quantity was updated.")

        else:
            order.items.add(order_item)
            messages.info(request, "This item was added to your cart.")
    else:
        ordered_date = timezone.now()
        order = Order.objects.create(
            user=request.user,
            start_date=ordered_date
        )
        order.items.add(order_item)
        messages.info(request, "This item was added to your cart.")

    #return redirect("core:product", slug=slug)
    return redirect("core:order-summary")


@login_required
def remove_from_cart(request, slug):
    item = get_object_or_404(Item, slug=slug)
    order_qs = Order.objects.filter(
        user=request.user, 
        ordered = False
    ) 
    if order_qs.exists():
        order = order_qs[0]
        #check if the item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order.items.remove(order_item)
            order_item.delete()
            messages.info(request, "This item was removed from your cart.")
            return redirect("core:order-summary")
        else:
            #add message saying user order doesnt have an item
            messages.info(request, "Your cart dont have this item.")
            return redirect("core:product", slug=slug)
    else:
        #add message saying that user doesnt have an order
        messages.info(request, "You doesnt even have a cart.")
        return redirect("core:product", slug=slug)



@login_required
def add_single_item_to_cart(request, slug):
    item = get_object_or_404(Item, slug=slug)
    order_qs = Order.objects.filter(
        user=request.user, 
        ordered = False
    ) 
    if order_qs.exists():
        order = order_qs[0]
        #check if the item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "This item's quantity was updated.")
            return redirect("core:order-summary")
        else:
            #add message saying user order doesnt have an item
            messages.info(request, "Your cart dont have this item.")
            return redirect("core:order-summary")
    else:
        #add message saying that user doesnt have an order
        messages.info(request, "You doesnt even have a cart.")
        return redirect("core:order-summary")


@login_required
def remove_single_item_from_cart(request, slug):
    item = get_object_or_404(Item, slug=slug)
    order_qs = Order.objects.filter(
        user=request.user, 
        ordered = False
    ) 
    if order_qs.exists():
        order = order_qs[0]
        #check if the item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
            else:
                order.items.remove(order_item)
                order_item.delete()
            messages.info(request, "This item's quantity was updated.")
            return redirect("core:order-summary")
        else:
            #add message saying user order doesnt have an item
            messages.info(request, "Your cart dont have this item.")
            return redirect("core:order-summary")
    else:
        #add message saying that user doesnt have an order
        messages.info(request, "You doesnt even have a cart.")
        return redirect("core:order-summary")