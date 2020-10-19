jQuery('#formcart').on("submit",function(e){
    e.preventDefault();
    var proid=jQuery('#proid').val();
    var size=jQuery('#product_size').val();
    var color=jQuery('#product_color').val();
    var proid=jQuery('#proid').val();
    var qty=jQuery('#show_'+proid).val();
    var type=jQuery('#addToCart').val();
    if(qty>0){
        jQuery.ajax({
            url:"manage_cart.php",
            type:"post",
            data:"size="+size+"&color="+color+"&pid="+proid+"&qty="+qty+"&type="+type,
            success:function(data){
                var data1=jQuery.parseJSON(data);
                if(data1.error=="itemAlreadyPresent"){
                    swal("Error message","This item already present in your cart","error");
                }else if(data1.success=="itemadded"){
                    swal("Success message","This item added to your cart successfully","success");
                    
                    jQuery('#totalitem').html(data1.totalitem);
                    jQuery('#totalprice').html(data1.totalprice);
                    jQuery('#totalitem1').html(data1.totalitem);
                    jQuery('#totalprice1').html(data1.totalprice);
                    jQuery('#totalprice2').html(data1.totalprice);
                    
                    if(data1.totalitem==1){
                        var totalpri=data1.product_price * data1.product_qty;
                        var html='<div class="dropdown-menu p-3" id="dropdown" style="min-width: 23rem;margin-top:50px;margin-right:-50px;"><table class="table table-hover table-borderless"><tbody id="addrow"><tr ><td colspan="3"><img src="'+WEBSITE_PATH+'customer/customer_p_images/'+data1.product_img+'" height="100px" width="100px" class="responsive-img" alt=""></td><td><p class="py-0 my-0"><h5><a href="">'+data1.product_name+'</a></h5></p><p class="my-0">Qty: '+data1.product_qty+'</p><p>'+totalpri+' Rs</p></td><td><a href=""><i class="fa fa-times text-danger my-4"></i></a></td></tr></tbody></table><hr><div class="row"><div class="col-md-8"><b>Total</b></div><div class="col-md-4 text-right text-danger" id="totalprice">'+data1.totalprice+' Rs</div></div><a href="'+WEBSITE_PATH+'cart.php" class="btn btn-block btn-outline-dark">VIEW CART</a><a href="'+WEBSITE_PATH+'checkout.php" class="btn btn-block btn-outline-dark">CHECKOUT</a></div>';
                        jQuery('#navbar_shopping_cart').append(html);
                    }else{
                        var totalpri=data1.product_price * data1.product_qty;
                        var html='<tr><td colspan="3"><img src="'+WEBSITE_PATH+'customer/customer_p_images/'+data1.product_img+'" height="100px" width="100px" class="responsive-img" alt=""></td><td><p class="py-0 my-0"><h5><a href="">'+data1.product_name+'</a></h5></p><p class="my-0">Qty: '+data1.product_qty+'</p><p>'+totalpri+' Rs</p></td><td><a href=""><i class="fa fa-times text-danger my-4"></i></a></td></tr>';
                        jQuery('#addrow').append(html);
                    }
                    
                    
                }
                
            }
        });
    }else{
        swal("Error message","Please select at least one item","error");
    }
});

function apply_coupon_code(){
    var coupon_value=jQuery('#apply_coupon').val();
    if(coupon_value==""){
        jQuery('#coupon_code_error_message').html("Please enter coupon code");
    }else{
        jQuery.ajax({
            url:"apply_coupon.php",
            type:"post",
            data:"coupon="+coupon_value,
            success:function(data){
                var data1=jQuery.parseJSON(data);
                if(data1.error=="couponNotExists"){
                    jQuery('#coupon_code_success_message').html("");
                    jQuery('#coupon_code_error_message').html(data1.msg);
                }else if(data1.status=="couponExpired"){
                    jQuery('#coupon_code_success_message').html("");
                    jQuery('#coupon_code_error_message').html(data1.msg);
                }else if(data1.status=="success"){
                    jQuery('#coupon_code_error_message').html("");
                    jQuery('#coupon_code_success_message').html(data1.msg);
                }else if(data1.status="couponValueLess"){
                    jQuery('#coupon_code_success_message').html("");
                    jQuery('#coupon_code_error_message').html(data1.msg);
                }
                
            }
        });
    }
}

function pro_size(){
    var pro_size=jQuery('#product_size').val();
    var type=jQuery('#type').val();
    var pro_id=jQuery('#proid').val();
    if(pro_size!=""){
        jQuery.ajax({
            url:"manage_sizecolor.php",
            type:"post",
            data:"pro_size="+pro_size+"&type="+type+"&pro_id="+pro_id,
            success:function(data){
                //var data1=JSON.parse(data)
                var data1=jQuery.parseJSON(data);
                //var val=jQuery('$product_color_0');
                if(data1.count>0){
                    var i=0;
                    if(document.getElementById('pro_color_0')!=null){
                        var html=jQuery('#product_color').html();
                        var cs=html.replace(html,'<select name="product_color" id="product_color" onchange="pro_size()" class="custom-select d-inline" required><option value="" selected>Select color</option></select>');
                        jQuery('#product_color').html(cs)
                    }
                    var i=0;
                    while(data1.count>i){
                        jQuery('#product_color').append('<option value="'+data1.array[i]+'" id="pro_color_'+i+'">'+data1.array[i]+'</option>');
                        i++;
                    }
                }
            }
        });
    }

}

function pro_color(){
    var pro_color=jQuery('#product_color').val();
    var pro_size=jQuery('#product_size').val();
    var type=jQuery('#type1').val();
    var pro_id=jQuery('#proid').val();
    jQuery('#product_price').html("NA");
    if(pro_color!="" && pro_size!=""){
        jQuery.ajax({
            url:"manage_sizecolor.php",
            type:"post",
            data:"pro_size="+pro_size+"&type="+type+"&pro_color="+pro_color+"&pro_id="+pro_id,
            success:function(data){
                jQuery('#product_price').html();
                jQuery('#product_price').html(data+" Rs");
                
            }
        });
    }

}

function additem(id){
    var add=jQuery('#show_'+id).val();
    add++;
    if(add>=100){
        add=100;
        var html="You cannot buy more than 100 items."
        jQuery('#message').html(html);
    }
    jQuery('#show_'+id).val(add);
}

function removeitem(id){
   var subtract=jQuery('#show_'+id).val();
    subtract--;
    if(subtract<=0){
        subtract=0;
    }
    jQuery('#show_'+id).val(subtract);
}

function update_cart_qty(qty){
    alert(qty);
}