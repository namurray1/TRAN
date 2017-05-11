<template>
    <div id="about">
        <div class="links">
            <ul role="nav">
                <v-link href="/">Home</v-link>
                <v-link href="/about">About</v-link>
            </ul>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"> About Us </h3>
            </div>
            <div class="panel-body text-center">
                <p>We are the Transport for Rescue Animals Network.This is designed to be a national database where any animal in need of transport to their new, forever home.If you would like to volunteer your time to help on a leg of one of our animal 's journey, please sign up and we' ll be happy to get you set up to help a loving animal in need!
                    <!--<button class="btn btn-primary btn-lg" onClick={this.handleClick}>CLICK ME!!!!</button>-->
                </p>
            </div>
            <div class="panel-body text-center"> { /* Here we create a button to take us to the Donation link. */ }
                <!--<button class="btn btn-danger btn-lg danger donation" onClick={ this.resetClick }> Donate </button>-->
            </div>
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