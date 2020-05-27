<template>
    <div id="tab-bar">
     <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
    #tab-bar{
        display: flex;
        background-color: #dcdcdc;
        position: fixed;
        bottom: 0;
        width: 100%;
        box-shadow: 0px -3px -1px rgba(100,100,100,0.2);
        z-index: 9;
        }
</style>
