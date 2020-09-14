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
                    distance: {
                      text: "5.6 km",
                      value: 5642,
                    },
                    duration: {
                      text: "19 mins",
                      value: 1142,
                    },
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
                    distance: {
                      text: "5.6 km",
                      value: 5642,
                    },
                    duration: {
                      text: "19 mins",
                      value: 1142,
                    },
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
                    distance: {
                      text: "5.7 km",
                      value: 5714,
                    },
                    duration: {
                      text: "20 mins",
                      value: 1194,
                    },
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
                    distance: {
                      text: "5.7 km",
                      value: 5714,
                    },
                    duration: {
                      text: "20 mins",
                      value: 1194,
                    },
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
          Program: "NULL",
          Speciality: "NULL",
          Rating: "NULL",
          SITE_ID: "NULL",
          DES_ID: "NULL",
          Latitude: "NULL",
          Longitude: "NULL",
          Address: "NULL",
          Site_Location: "NULL",
          Street: "NULL",
          Route: "NULL",
          City: "NULL",
          State: "NULL",
          Country: "NULL",
          Postal: "NULL",
          URL: "NULL",
          Phone: "NULL",
          Email: "NULL",
          Radial_distance: "NULL",
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
                    distance: {
                      text: "5.8 km",
                      value: 5831,
                    },
                    duration: {
                      text: "21 mins",
                      value: 1283,
                    },
                    status: "OK",
                  },
                ],
              },
            ],
            status: "OK",
          },
          Distance: "NULL",
          Name: "NULL",
          Website: "NULL",
        },
      },
      null_des_site: false,
      show_des_site: false,
      site_location_info: {},
      show_site_location_info: false,
      entered_address: "",
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
      console.log("123", this.entered_address, this.specialityName);
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/map?user_loc=${this.entered_address}&user_spec=${this.specialityName}`,
        // "https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/map?user_loc=5 Dudley street 3145&user_spec=All Client Types",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // this.des_site_five = {};
          this.des_site_five = JSON.parse(result);
          console.log(this.des_site_five);
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
      this.initMap();
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
    initMap() {
      const uluru = {
        lat: -25.363,
        lng: 131.044,
      };
      const mapDiv = document.getElementById("google-map");
      console.log(mapDiv);
      const map = new google.maps.Map(mapDiv, {
        // const map = new google.maps.Map(document.querySelector("#google-map"), {
        zoom: 4,
        center: uluru,
      });
      console.log(map);
      const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map,
        title: "Uluru (Ayers Rock)",
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
      console.log(uluru);
    },
  },
  mounted() {
    // this.initMap();
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
