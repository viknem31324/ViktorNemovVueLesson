export default {
    created() {
        var check = this.$root.checkLogin;
        if (check) {
            // this.$router.push("/")
        }else if(!check) {
            // this.$router.push("/tasklist")
        }
    }
}