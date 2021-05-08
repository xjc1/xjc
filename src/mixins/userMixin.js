
import { serachUserList } from "@/network/login";
import { mapState, mapMutations } from "vuex";

export const userMixin = {
  data() {
    return {
      allUserList: [],
      isAdmin: false,
    }
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
  },
  async created() {
    const { data = [] } = await serachUserList();
    this.allUserList = data;
    const nowUser = this.allUserList.filter(item => (this.userInfo.name == item.name))
    console.log(nowUser, 'nowUser')
    if (nowUser[0].role == 'admin'){
      this.isAdmin = true;
      this.setUserPermission(true)
    }
    console.log('allUserList', this.allUserList, 'this.isAdmin', this.isAdmin)
  },
  methods: {
    ...mapMutations('userInfo', ["setUserPermission"]),
  },
};
