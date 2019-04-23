# DIA 18/12/2018

- Mudei a Navbar e o footer para o APP.VUE e fixei o footer em baixo.

### É preciso estilizar Navbar

# Dia 07/01/2019

- secalhar a melhor ideia para os badges é sempre que se vai para a home page,

#Dia 22/01/2019

-apex-charts : npm install --save vue-apexcharts apexcharts

console.log("ainda não está no localstorage");
        let payload = {
          // PKx5elCuP-52eqXNW9oWPQ, meu token
          // I6EFQFoKLa1FFP453_jzQg , token pedro
          // k_x0qyzrU3rzj9Y2qfzQSA, mais um meu
          // 8NqHTT2oovurU8SOUFhuSg, jonas
          //Mn4xigS5bbMoHf8DRqmiHA
          //S7swes5kWKmU6fHC-PcvXA joao gmail
          /*Vai ter um objeto com iduser, idthread, idAnswer, idComment
          se estes dois ultimos não tiverem preenchidos é porque pertence a uma thread (users upvotes) */
          token: "I6EFQFoKLa1FFP453_jzQg",
          data: {
            id: 1,
            name: "personNickname",
            password: "personPassword",
            email: "internetEmail",
            exp: "numberInt",
            level: 0,
            badges: [], //Já não é preciso pedir badges para os utilizadores
            rank: "numberInt",
            desc: "stringLong",
            foto: "personAvatar",
            follow: "functionArray|3|numberInt|1,10",
            skills: "personSkill",
            upvotes: [],
            _repeat: 1
          }
        };

        $.ajax({
          type: "POST",
          url: "https:app.fakejson.com/q",
          data: payload,
          success: (resp => {
            // console.log(resp);
            return resp;
          })(ans => {
            for (let i = 0; i < ans.length; i++) {
              ans[i].id = i + 1;
            }
            console.log(ans);
            context.commit("save_users", ans);
          })
        });