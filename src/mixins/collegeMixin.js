import { searchCollegeInfo } from "@/network/college";
const params = {
  cprovince: "",
  name: "",
  ctype: "",
  cteshe: "",
}

export const collegeMixin = {
  data() {
    return {
      allCollegeList:[]
    }
  },
 async created() {
    const { data = [] } = await searchCollegeInfo(params);
    this.allCollegeList = data;
    console.log('allCollegeList',this.allCollegeList)
  },
};
