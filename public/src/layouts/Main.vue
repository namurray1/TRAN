<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="jumbotron">
                    <h2 class="text-center">TRAN (Transport Animal Rescue Network)</h2>
                </div>
            </div>
        </div>
        <div class="links">
            <ul role="nav">
                <v-link href="/">Home</v-link>
                <v-link href="/about">About</v-link>
            </ul>
        </div>
        <div class="container" id="main-content">
            HOW DO WE GET CHILDREN IN HERE?
        </div>
    </div>
</template>

<script>
import VLink from '../components/VLink.vue'

export default {
    components: {
        VLink
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #f9f7f5;
}
</style>
