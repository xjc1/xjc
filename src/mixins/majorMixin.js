
import { searchMajor } from "@/network/major";
const params = {
  cname: "",
  name: "",
  zxueke: "",
  zmenlei: "",
  zcode: ""
}

export const majorMixin = {
  data() {
    return {
      allMajorList: []
    }
  },
  async created() {
    const { data = [] } = await searchMajor(params);
    this.allMajorList = data;
    console.log('allMajorList', this.allMajorList)
  },
};
