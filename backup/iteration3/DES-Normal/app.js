new Vue({
  el: "#vue-app",
  data() {
    return {
      homepage: "HOME PAGE",
      infoList: [],
      showList: [],
      nameList: [{ value: "All Providers" }],
      specialityList: [{ value: "Select All Specialities" }],
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
      specialityName: "Select All Specialities",
      rating: "All Ratings",
      selectedRatings: [],
      showListLength: 1,
      des_site_five: {},
      null_des_site: false,
      show_des_site: false,
      site_location_info: {},
      show_site_location_info: false,
      entered_address: "",
      placeSearch: undefined,
      autocomplete: undefined,
      provider_map_name: "",
      provider_map_site: "",
      provider_map_program: "",
      is_nearby_button_loading: false,
      checkedRatings: [],
      showListLength_two: 1,
      //performance page
      init_performance: {},
      init_year: 2020,
      init_month: "August",
      year_list: [],
      month_list: [],
      // performance_total: 0,
      // performance_mom: 0,
      // performance_direction: "",
      // performance_referred: 0,
      // performance_commenced: 0,
      // performance_commenced_employment: 0,
      // performance_commenced_placement: 0,
      // performance_commenced_ongoing: 0,
      // performance_suspended: 0,
      isShowCaseStatus: false,
      isShowCaseloadTrend: false,
      btnFlag: false,
      des_lat: 0.0,
      des_lng: 0.0,
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

    // Click on the picture to go back to the top method, adding a timer is for smooth transition
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // In order to calculate the height from the top, when the height is greater than 60, the top icon will be displayed, and the icon will be hidden if it is less than 60.
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 0) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    switchCaseStatus() {
      // console.log("111");
      this.isShowCaseloadTrend = false;
      if (this.isShowCaseStatus == false) {
        this.isShowCaseStatus = true;
      } else {
        this.isShowCaseStatus = false;
      }
    },
    switchCaseloadTrend() {
      // console.log("222");
      this.isShowCaseStatus = false;
      if (this.isShowCaseloadTrend == false) {
        this.isShowCaseloadTrend = true;
      } else {
        this.isShowCaseloadTrend = false;
      }
    },
    searchPerformance() {
      // console.log(this.init_performance.year, this.init_performance.month);
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/performance?year=${this.init_performance.year}&month=${this.init_performance.month}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // console.log("performance", result);
          this.init_performance = JSON.parse(result).Data[0];
          console.log("performance", this.init_performance);
          this.init_year = this.init_performance.year;
          this.init_month = this.init_performance.month;
        })
        .catch((error) => console.log("error", error));
    },
    handleCheckAllChange() {
      console.log("test");
      if (this.checkedRatings.length !== 6) {
        this.checkedRatings = ["5", "4", "3", "2", "1", "All Ratings"];
      } else this.checkedRatings = [];
    },
    handleCheckedRatingsChange() {
      console.log("submit");
      let resultData = [];
      for (let selectedRating of this.checkedRatings) {
        //  combine filtered results
        resultData = resultData.concat(
          this.infoList.filter((info) => info.rating == selectedRating)
        );
        // resultData.sort((a, b) => b.rating - a.rating);
        console.log("resultData", resultData);
      }

      //use array.indexOf() to determine whether the ratings contains "All Ratings"
      let isAllRatings = this.checkedRatings.indexOf("All Ratings");
      console.log("x", isAllRatings);
      if (this.checkedRatings.length === 0 || isAllRatings != -1) {
        resultData = this.infoList;
      }
      this.showList = resultData;
      this.showList.sort((a, b) => b.rating - a.rating);
      this.showListLength_two = this.showList.length;
      console.log("showlist", this.showList);
    },
    geolocate() {
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     const geolocation = {
      //       // lat: position.coords.latitude,
      //       // lng: position.coords.longitude,
      //       lat: -37.881812,
      //       lng: 145.058236,
      //     };
      //     const circle = new google.maps.Circle({
      //       center: geolocation,
      //       radius: position.coords.accuracy,
      //       // radius: 50,
      //       // language: en,
      //     });
      //     this.autocomplete.setBounds(circle.getBounds());
      //   });
      // }
      const geolocation = {
        // lat: position.coords.latitude,
        // lng: position.coords.longitude,
        lat: -37.881812,
        lng: 145.058236,
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: 250000,
        // radius: 50,
        // language: en,
      });
      this.autocomplete.setBounds(circle.getBounds());
    },
    handleClear() {
      this.providerName = "All Providers";
      this.specialityName = "Select All Specialities";
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
          this.showList.sort((a, b) => b.rating - a.rating);
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
      if (this.entered_address == ""){
        try {
          this.fillInAddress();
        } catch {
          this.null_des_site = true;
          this.show_des_site = false;
        }
      }
      console.log("123", this.entered_address, this.specialityName);
      if (this.entered_address != "" && this.specialityName != "") {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        this.is_nearby_button_loading = true;
        this.null_des_site = false;
        this.show_des_site = false;

        fetch(
          `https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/map?user_loc=${this.entered_address}&user_spec=${this.specialityName}`,
          // "https://g7n5ifjzkj.execute-api.us-east-1.amazonaws.com/api/map?user_loc=5 Dudley street 3145&user_spec=All Client Types",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            // this.des_site_five = {};
            this.des_site_five = JSON.parse(result);
            console.log("123", this.des_site_five);
            if (JSON.stringify(this.des_site_five) === "{}") {
              // if (!this.des_site_five.hasOwnProperty("site_one")) {
              this.null_des_site = true;
              this.show_des_site = false;
            } else {
              this.null_des_site = false;
              this.show_des_site = true;
              // document.getElementById("sec-b6d8").scrollIntoView(true);
              // document.querySelector("#sec-b6d8").scrollTo();
              // window.scrollTo("#sec-b6d8");

              window.scrollTo(0, 600);
              this.is_nearby_button_loading = false;
            }
          })
          .catch((error) => {
            console.log("error", error);
            this.null_des_site = true;
            this.is_nearby_button_loading = false;
            this.show_site_location_info = false;
            this.show_des_site = false;
          });
      } else {
        this.null_des_site = true;
        this.show_des_site = false;
      }
      // this.is_nearby_button_loading = false;
    },
    selectProvider1() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_one.Address;
      temp.email = this.des_site_five.site_one.Email;
      temp.phone = this.des_site_five.site_one.Phone;
      temp.website = this.des_site_five.site_one.Website;
      temp.url = this.des_site_five.site_one.URL;
      this.site_location_info = temp;
      console.log(this.site_location_info);

      this.initMap(
        this.des_site_five.site_one.Latitude,
        this.des_site_five.site_one.Longitude,
        this.des_site_five.site_one.URL,
        this.des_site_five.site_one.Name
      );
      this.show_site_location_info = true;
      this.provider_map_name = this.des_site_five.site_one.Name;
      this.provider_map_site = this.des_site_five.site_one.Site_Location;
      this.provider_map_program = this.des_site_five.site_one.Program;
    },
    selectProvider2() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_two.Address;
      temp.email = this.des_site_five.site_two.Email;
      temp.phone = this.des_site_five.site_two.Phone;
      temp.website = this.des_site_five.site_two.Website;
      temp.url = this.des_site_five.site_two.URL;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
      this.initMap(
        this.des_site_five.site_two.Latitude,
        this.des_site_five.site_two.Longitude,
        this.des_site_five.site_two.URL,
        this.des_site_five.site_two.Name
      );
      this.provider_map_name = this.des_site_five.site_two.Name;
      this.provider_map_site = this.des_site_five.site_two.Site_Location;
      this.provider_map_program = this.des_site_five.site_two.Program;
    },
    selectProvider3() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_three.Address;
      temp.email = this.des_site_five.site_three.Email;
      temp.phone = this.des_site_five.site_three.Phone;
      temp.website = this.des_site_five.site_three.Website;
      temp.url = this.des_site_five.site_three.URL;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
      this.initMap(
        this.des_site_five.site_three.Latitude,
        this.des_site_five.site_three.Longitude,
        this.des_site_five.site_three.URL,
        this.des_site_five.site_three.Name
      );
      this.provider_map_name = this.des_site_five.site_three.Name;
      this.provider_map_site = this.des_site_five.site_three.Site_Location;
      this.provider_map_program = this.des_site_five.site_three.Program;
    },
    selectProvider4() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_four.Address;
      temp.email = this.des_site_five.site_four.Email;
      temp.phone = this.des_site_five.site_four.Phone;
      temp.website = this.des_site_five.site_four.Website;
      temp.url = this.des_site_five.site_four.URL;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
      this.initMap(
        this.des_site_five.site_four.Latitude,
        this.des_site_five.site_four.Longitude,
        this.des_site_five.site_four.URL,
        this.des_site_five.site_four.Name
      );
      this.provider_map_name = this.des_site_five.site_four.Name;
      this.provider_map_site = this.des_site_five.site_four.Site_Location;
      this.provider_map_program = this.des_site_five.site_four.Program;
    },
    selectProvider5() {
      // console.log("click");
      let temp = {};
      temp.address = this.des_site_five.site_five.Address;
      temp.email = this.des_site_five.site_five.Email;
      temp.phone = this.des_site_five.site_five.Phone;
      temp.website = this.des_site_five.site_five.Website;
      temp.url = this.des_site_five.site_five.URL;
      this.site_location_info = temp;
      console.log(this.site_location_info);
      this.show_site_location_info = true;
      this.initMap(
        this.des_site_five.site_five.Latitude,
        this.des_site_five.site_five.Longitude,
        this.des_site_five.site_five.URL,
        this.des_site_five.site_five.Name
      );
      this.provider_map_name = this.des_site_five.site_five.Name;
      this.provider_map_site = this.des_site_five.site_five.Site_Location;
      this.provider_map_program = this.des_site_five.site_five.Program;
    },
    initMap(lat, lng, url, name) {
      const provider = {
        lat: Number(lat),
        lng: Number(lng),
      };

      const user = {
        lat: Number(this.des_site_five.cur_lat),
        lng: Number(this.des_site_five.cur_lng),
      };

      const center = {
        lat: (provider.lat + user.lat) / 2,
        lng: (provider.lng + user.lng) / 2,
      };

      // console.log(lat, lng);
      const mapDiv = document.getElementById("google-map");
      console.log(mapDiv);
      const map = new google.maps.Map(mapDiv, {
        // const map = new google.maps.Map(document.querySelector("#google-map"), {
        zoom: 13,
        center: center,
      });
      console.log(map);

      const infowindow = new google.maps.InfoWindow({
        // content: contentString,
        content: name,
      });

      const infowindow2 = new google.maps.InfoWindow({
        // content: contentString,
        content: "Your Location",
      });

      const marker = new google.maps.Marker({
        position: provider,
        map,
        title: name,
        // label: name,
      });

      const marker2 = new google.maps.Marker({
        position: user,
        map,
        title: "Your location",
        // label: "You",
      });

      infowindow.open(map, marker);
      infowindow2.open(map, marker2);
      marker.addListener("click", () => {
        // infowindow.open(map, marker);
        window.open(url, "_blank");
      });
      console.log(provider);
      // this.initAutocomplete();

      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      directionsRenderer.setMap(map);
      this.calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        provider.lat,
        provider.lng
      );
    },
    calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      des_lat,
      des_lng
    ) {
      // const selectedMode = document.getElementById("mode").value;
      console.log("123", des_lat, des_lng);
      const selectedMode = "DRIVING";
      directionsService.route(
        {
          origin: {
            lat: this.des_site_five.cur_lat,
            lng: this.des_site_five.cur_lng,
          },
          destination: { lat: des_lat, lng: des_lng },
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode],
        },
        (response, status) => {
          if (status == "OK") {
            console.log(response);
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    initAutocomplete() {
      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
          types: ["geocode"],
          // types: ["(cities)"],
          componentRestrictions: { country: "au" },
        }
      ); // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.

      // this.autocomplete.setFields(["address_component"]);
      // // When the user selects an address from the drop-down, populate the
      // // address fields in the form.

      // this.autocomplete.addListener("place_changed", this.fillInAddress());
      console.log("auto-complete", this.autocomplete);
    },
    fillInAddress() {
      const place = this.autocomplete.getPlace();
      console.log("fill",place);
      // let str =
      //   place.address_components[0].short_name +
      //   " " +
      //   place.address_components[1].short_name +
      //   ", " +
      //   place.address_components[2].short_name +
      //   " " +
      //   // place.address_components[3].short_name +
      //   // " " +
      //   place.address_components[4].long_name +
      //   ", " +
      //   place.address_components[5].long_name;
      let str = place.formatted_address;
      console.log("str", str);
      this.entered_address = str;
    },
    getAddress() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // let pos = {
            //   lat: position.coords.latitude,
            //   lng: position.coords.longitude,
            // };
            // infoWindow.setPosition(pos);
            // infoWindow.setContent("Location found.");
            // infoWindow.open(map);
            // map.setCenter(pos);
            // console.log("current location:",pos)
            var requestOptions = {
              method: "GET",
              redirect: "follow",
            };

            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDtU4wnc7N3-U9QMpRCG5CCaqCJc2nYuz8&language=en_AU`,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                // console.log("address",result);
                let res = JSON.parse(result);
                // console.log("address", res.results[0].formatted_address);
                this.entered_address = res.results[0].formatted_address;
              })
              .catch((error) => console.log("error", error));
          }
          // () => {
          //   handleLocationError(true, infoWindow, map.getCenter());
          // }
        );
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
      }
    },
  },
  mounted() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       let pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };
    //       // infoWindow.setPosition(pos);
    //       // infoWindow.setContent("Location found.");
    //       // infoWindow.open(map);
    //       // map.setCenter(pos);
    //       console.log("current location:",pos)
    //     },
    //     () => {
    //       handleLocationError(true, infoWindow, map.getCenter());
    //     }
    //   );
    // } else {
    //   // Browser doesn't support Geolocation
    //   handleLocationError(false, infoWindow, map.getCenter());
    // }

    window.addEventListener("scroll", this.scrollToTop);
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
        this.showList.sort((a, b) => b.rating - a.rating);
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

        // for performance page
        let init_performance = JSON.parse(result).Latest_Performance[0];
        console.log(init_performance);
        this.init_performance = init_performance;
        // console.log("init_performance", this.init_performance);
        // this.performance_total = init_performance.total;
        // this.performance_mom = init_performance.mom;
        // this.performance_direction = init_performance.direction;
        // this.performance_referred = init_performance.referred;
        // this.performance_commenced = init_performance.commenced;
        // this.performance_commenced_employment =
        //   init_performance.commenced_employment;
        // this.performance_commenced_placement =
        //   init_performance.commenced_placement;
        // this.performance_commenced_ongoing = init_performance.commenced_ongoing;
        // this.performance_suspended = init_performance.suspended;
        let y_list = JSON.parse(result).Year_List;
        let m_list = JSON.parse(result).Month_List;
        // console.log(y_list, m_list);
        for (let info of y_list) {
          this.year_list.push({ value: info });
        }
        for (let info of m_list) {
          this.month_list.push({ value: info });
        }

        this.initAutocomplete();
      })
      .catch((error) => console.log("error", error));
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
});
