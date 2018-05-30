<template>
    <div>
        <img :src="commodity.img">
        <p>
            {{commodity.comment}}
        </p>
    </div>
</template>

<script>
export default {
    props:["commodity"]
}
</script>

