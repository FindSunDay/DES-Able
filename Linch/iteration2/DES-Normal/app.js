new Vue({
  el: "#vue-app",
  data() {
    return {
      homepage: "HOME PAGE",
      infoList: [],
      showList: [],
      nameList: [{ value: "All Providers" }],
      specialityList: [{ value: "All Specialities" }],
      ratingList: [
        { value: "All Ratings" },
        { value: 5 },
        { value: 4 },
        { value: 3 },
        { value: 2 },
        { value: 1 },
      ],
      postInput: "",
      providerName: "All Providers",
      specialityName: "All Specialities",
      rating: "All Ratings",
      selectedRatings: [],
      showListLength: 1,
      des_site_five: {},
      null_des_site: false,
      show_des_site: false,
      site_location_info: {},
      show_site_location_info: false,
    };
  },
  methods: {
    // handleNameSelected(selectedName) {
    //   // console.log(selectedName);
    //   if(selectedName!="All Providers"){}
    //   for(let item of infoList){
    //   }
    // }
    // },
    handleClear() {
      this.providerName = "All Providers";
      this.specialityName = "All Specialities";
      this.selectedRatings = [];
      this.postInput = "";
    },
    handleSearch() {
      var requestOptions1 = {
        method: "GET",
        redirect: "follow",
      };

      console.log("click");
      this.infoList = [];
      this.showList = [];

      // console.log("1", this.rating);

      fetch(
        `https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/search?name=${this.providerName}&speciality=${this.specialityName}&rating=All Ratings&postal=${this.postInput}`,
        requestOptions1
      )
        .then((response) => response.text())
        .then((result) => {
          this.infoList = JSON.parse(result).All_Info;
          console.log("infoList", this.infoList);

          //filter the results based on the values of selected ratings
          console.log("selectedRatings", this.selectedRatings);
          let resultData = [];
          for (let selectedRating of this.selectedRatings) {
            //  combine filtered results
            resultData = resultData.concat(
              this.infoList.filter((info) => info.rating == selectedRating)
            );
            console.log("resultData", resultData);
          }

          //use array.indexOf() to determine whether the ratings contains "All Ratings"
          let isAllRatings = this.selectedRatings.indexOf("All Ratings");
          console.log("x", isAllRatings);
          if (this.selectedRatings.length === 0 || isAllRatings != -1) {
            resultData = this.infoList;
          }
          this.showList = resultData;
          this.showListLength = this.showList.length;
          console.log("showlist", this.showList);

          // this.showList = this.infoList;

          // // remove duplicated values
          // names = [...new Set(names)];
          // names.sort();
          // // console.log(names);
          // specialities = [...new Set(specialities)];
          // specialities.sort();

          // //form as json list
          // for (let info of names) {
          //   this.nameList.push({ value: info });
          // }

          // for (let info of specialities) {
          //   this.specialityList.push({ value: info });
          // }

          console.log(this.nameList);
          console.log(this.specialityList);
          // console.log("info:", this.infoList);
          // console.log(this.homepage);
        })
        .catch((error) => console.log("error", error));
    },
    handleSearchNearby() {
      console.log("123");
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/map",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // this.des_site_five = {};
          this.des_site_five = JSON.parse(result);
          // console.log(this.des_site_five);
          if (JSON.stringify(this.des_site_five) === "{}") {
            this.null_des_site = true;
            this.show_des_site = false;
          } else {
            this.null_des_site = false;
            this.show_des_site = true;
          }
        })
        .catch((error) => console.log("error", error));
    },
    selectProvider1() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_one.Address;
      temp.email = this.des_site_five.site_one.Email;
      temp.phone = this.des_site_five.site_one.Phone;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
    },
    selectProvider2() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_two.Address;
      temp.email = this.des_site_five.site_two.Email;
      temp.phone = this.des_site_five.site_two.Phone;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
    },
    selectProvider3() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_three.Address;
      temp.email = this.des_site_five.site_three.Email;
      temp.phone = this.des_site_five.site_three.Phone;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
    },
    selectProvider4() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_four.Address;
      temp.email = this.des_site_five.site_four.Email;
      temp.phone = this.des_site_five.site_four.Phone;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
    },
    selectProvider5() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_five.Address;
      temp.email = this.des_site_five.site_five.Email;
      temp.phone = this.des_site_five.site_five.Phone;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
    },
  },
  mounted() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/allinfo",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        this.infoList = JSON.parse(result).All_Info;
        this.showList = this.infoList;
        // console.log(this.infoList);
        let names = JSON.parse(result).Name_List;
        let specialities = JSON.parse(result).Speciality_List;
        names.sort();
        // names.map((name) => ({ value: name, label: name }));
        specialities.sort();
        // specialities.map((speciality) => ({
        //   value: speciality,
        //   label: speciality,
        // }));

        // this.nameList = names;
        // this.specialityList = specialities;

        for (let info of names) {
          // console.log(info);
          this.nameList.push({ value: info });
        }

        for (let info of specialities) {
          this.specialityList.push({ value: info });
        }

        console.log(this.nameList);
        console.log(this.specialityList);
        // console.log(this.homepage);
      })
      .catch((error) => console.log("error", error));
  },
});
