<template>
    <div class="add-cart">
        <img src="~assets/img/detail/成功.svg" alt="">
        <p>添加成功，在购物车等亲~</p>
    </div>
</template>

<script>
export default {
  name: 'DetailAddCart'
}
</script>

<style scoped>
    .add-cart{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: rgba(0, 0, 0, .9);
        text-align: center;
        padding: 8px 8px 8px;
        font-size: 10px;
        border-radius: 5px;
    }
    .add-cart img{
        width: 30px;
        margin-bottom: 8px;
    }
</style>
