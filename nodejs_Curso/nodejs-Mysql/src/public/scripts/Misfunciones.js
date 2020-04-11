$(function(){    
    $(document).ready(()=>{
        var btn=$('.btnGuardar');
        var url='';
        var cud=0;
        $('.btnAgregar').click((e)=>{
            cud=3;
            btn[0].innerHTML='Guardar';
            e.preventDefault();
            url=$(e.currentTarget).attr('href');
            $('#myModal').modal('show');
            $.get(url).done(function(data){
                var dataa=data[0];
                $('#myModal form input,textarea').each(function(){ 
                    this.value='';
                    $(this).removeAttr('disabled');

                });
                
            });
            
        });

        $('.btnActualizar').click((e)=>{
            cud=2;
            btn[0].innerHTML='Guardar';
            e.preventDefault();
            url=$(e.currentTarget).attr('href');
            $('#myModal').modal('show');
            $.get(url).done(function(data){
                var dataa=data[0];
                $('#myModal form input,textarea').each(function(){ 
                    this.value=dataa[`${this.name}`];
                    $(this).removeAttr('disabled');

                });
                
            });
            
        });

        $('.btnBorrar').on('click',function(){
            cud=1;
            btn[0].innerHTML='Borrar';
            url=$(this).attr('href');
            $('#myModal').modal('show');
            $.get(url).done(function(data){
                var dataa=data[0];
                $('#myModal form input,textarea').each(function(){ 
                    this.value=dataa[`${this.name}`];
                    $(this).attr('disabled','disabled');
                });
                
            });
            return false;    
        });
        
        $('.btnGuardar').click((e)=>{
            var data={};            
            data.cud=cud;
            $('#myModal form input,textarea').each(function(){ 
                data[this.name]=this.value;
            });
            console.log(data)

            $.ajax({
                url:url,
                type:'post',
                data:data,
                dataType:'json'
                //beforeSend:()=>{}
            }).done((res)=>{
                //alert('transaccion exitosa');
                location.reload();
            }).fail((err)=>{
                alert(err);

            })
        });
    });


    
})