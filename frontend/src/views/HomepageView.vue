<script>
 
</script>

<template>
    <div class="welcome-container">
        <div class="content-contianer">
            <div class="header-title">
                <h4>Welcome to AnotherMe</h4>
            </div>
            <div class="body-content">
                <div class="setting-img">
                    <img width="300" height="300" src="../components/img/homepage.jpg"/>
                </div>
            </div>
            <div class="footer-container">
                <h5>Created by Nexter Living team.</h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
.welcome-container{
    text-align: center;
    margin: auto;
    background: white;
    border-radius: 30px;
    height: 100%;
    margin-top: 10%;
    width: 85%;
}

.content-contianer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
}

.header-title{
    margin-top: 10%;
}

.body-content{
    margin-top: 15%;
}

.footer-container{
    margin-top: 40%;
    padding-bottom: 40px;
}

.setting-img{
    margin-top: 10%
}

</style>