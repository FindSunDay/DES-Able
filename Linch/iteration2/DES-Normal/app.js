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
      des_site_five: {
        site_one: {
          Program: "Disability Management Service",
          Speciality: "All Client Types",
          Rating: "2",
          SITE_ID: "6",
          DES_ID: "1",
          Latitude: "-37.89991440000001",
          Longitude: "145.0890916",
          Address: "9-11 Portman St, Oakleigh VIC 3166, Australia",
          Site_Location: "OAKLEIGH",
          Street: "9-11",
          Route: "Portman Street",
          City: "Monash City",
          State: "VIC",
          Country: "Australia",
          Postal: "3166",
          URL: "https://maps.google.com/?cid=11453817125495033597",
          Phone: "(03) 9569 4927",
          Email: "apm4jobs@apm.net.au",
          Radial_distance: 4.21,
          Distance_API: {
            destination_addresses: [
              "9 Portman St, Oakleigh VIC 3166, Australia",
            ],
            origin_addresses: [
              "5 Dudley St, Caulfield East VIC 3145, Australia",
            ],
            rows: [
              {
                elements: [
                  {
                    distance: { text: "5.6 km", value: 5642 },
                    duration: { text: "19 mins", value: 1142 },
                    status: "OK",
                  },
                ],
              },
            ],
            status: "OK",
          },
          Distance: 5.6,
          Name: "APM Employment Services",
          Website: "https://apm.net.au",
        },
        site_two: {
          Program: "Employment Support Service",
          Speciality: "All Client Types",
          Rating: "3",
          SITE_ID: "6",
          DES_ID: "1",
          Latitude: "-37.89991440000001",
          Longitude: "145.0890916",
          Address: "9-11 Portman St, Oakleigh VIC 3166, Australia",
          Site_Location: "OAKLEIGH",
          Street: "9-11",
          Route: "Portman Street",
          City: "Monash City",
          State: "VIC",
          Country: "Australia",
          Postal: "3166",
          URL: "https://maps.google.com/?cid=11453817125495033597",
          Phone: "(03) 9569 4927",
          Email: "apm4jobs@apm.net.au",
          Radial_distance: 4.21,
          Distance_API: {
            destination_addresses: [
              "9 Portman St, Oakleigh VIC 3166, Australia",
            ],
            origin_addresses: [
              "5 Dudley St, Caulfield East VIC 3145, Australia",
            ],
            rows: [
              {
                elements: [
                  {
                    distance: { text: "5.6 km", value: 5642 },
                    duration: { text: "19 mins", value: 1142 },
                    status: "OK",
                  },
                ],
              },
            ],
            status: "OK",
          },
          Distance: 5.6,
          Name: "APM Employment Services",
          Website: "https://apm.net.au",
        },
        site_three: {
          Program: "Disability Management Service",
          Speciality: "All Client Types",
          Rating: "1",
          SITE_ID: "24",
          DES_ID: "5",
          Latitude: "-37.8990345",
          Longitude: "145.0884724",
          Address: "11 Station St, Oakleigh VIC 3166, Australia",
          Site_Location: "OAKLEIGH",
          Street: "11",
          Route: "Station Street",
          City: "Monash City",
          State: "VIC",
          Country: "Australia",
          Postal: "3166",
          URL: "https://maps.google.com/?cid=2107608628032716906",
          Phone: "1300 385 738",
          Email: "dvjs@dvjs.com.au",
          Radial_distance: 4.11,
          Distance_API: {
            destination_addresses: [
              "11 Station St, Oakleigh VIC 3166, Australia",
            ],
            origin_addresses: [
              "5 Dudley St, Caulfield East VIC 3145, Australia",
            ],
            rows: [
              {
                elements: [
                  {
                    distance: { text: "5.7 km", value: 5714 },
                    duration: { text: "20 mins", value: 1194 },
                    status: "OK",
                  },
                ],
              },
            ],
            status: "OK",
          },
          Distance: 5.7,
          Name: "DVJS Employment Solutions",
          Website: "https://www.dvjs.com.au",
        },
        site_four: {
          Program: "Employment Support Service",
          Speciality: "All Client Types",
          Rating: "4",
          SITE_ID: "24",
          DES_ID: "5",
          Latitude: "-37.8990345",
          Longitude: "145.0884724",
          Address: "11 Station St, Oakleigh VIC 3166, Australia",
          Site_Location: "OAKLEIGH",
          Street: "11",
          Route: "Station Street",
          City: "Monash City",
          State: "VIC",
          Country: "Australia",
          Postal: "3166",
          URL: "https://maps.google.com/?cid=2107608628032716906",
          Phone: "1300 385 738",
          Email: "dvjs@dvjs.com.au",
          Radial_distance: 4.11,
          Distance_API: {
            destination_addresses: [
              "11 Station St, Oakleigh VIC 3166, Australia",
            ],
            origin_addresses: [
              "5 Dudley St, Caulfield East VIC 3145, Australia",
            ],
            rows: [
              {
                elements: [
                  {
                    distance: { text: "5.7 km", value: 5714 },
                    duration: { text: "20 mins", value: 1194 },
                    status: "OK",
                  },
                ],
              },
            ],
            status: "OK",
          },
          Distance: 5.7,
          Name: "DVJS Employment Solutions",
          Website: "https://www.dvjs.com.au",
        },
        site_five: {
          Program: "Disability Management Service",
          Speciality: "All Client Types",
          Rating: "2",
          SITE_ID: "30",
          DES_ID: "7",
          Latitude: "-37.898829",
          Longitude: "145.089438",
          Address: "Level 3/20 Atherton Rd, Oakleigh VIC 3166, Australia",
          Site_Location: "OAKLEIGH",
          Street: "20",
          Route: "Atherton Road",
          City: "Monash City",
          State: "VIC",
          Country: "Australia",
          Postal: "3166",
          URL: "https://maps.google.com/?cid=8402084603579845786",
          Phone: "(03) 8574 4300",
          Email: "info@jobfind.com.au",
          Radial_distance: 4.17,
          Distance_API: {
            destination_addresses: [
              "20-22 Atherton Rd, Oakleigh VIC 3166, Australia",
            ],
            origin_addresses: [
              "5 Dudley St, Caulfield East VIC 3145, Australia",
            ],
            rows: [
              {
                elements: [
                  {
                    distance: { text: "5.8 km", value: 5831 },
                    duration: { text: "21 mins", value: 1283 },
                    status: "OK",
                  },
                ],
              },
            ],
            status: "OK",
          },
          Distance: 5.8,
          Name: "Jobfind",
          Website: "https://jobfind.com.au/",
        },
      },
      null_des_site: false,
      show_des_site: false,
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
          // this.des_site_five = result;
          console.log(result);
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
