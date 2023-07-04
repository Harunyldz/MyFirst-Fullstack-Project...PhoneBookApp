FullStack PhoneBook Project

Projede express.js ile mongoose kullanılarak hazırlanmış bir apideki routerlardan axios ile GET,POST,PUT ve DELETE işlemlerini kullanarak id ,name ve phone bilgilerini içeren Contact lardan oluşan bir PhoneBook tablosu bulunmaktadır.


Kullanılan teknolojiler

backend:

    express.js (api tasarımı için)
        ```
        npm i express-generator
        ```
    cors (aynı bilgisayardaki farklı kaynaklar arsında veri alışverişine izin verir)
         ``
        npm i cors
        ```
    mongoose (mongoDB konnektörü)
        ```
        npm i mongoose
        ```
    nodemon(node.js deki değişiklerin anında sonuca yansımasını sağlar)


frontend:

    react
        ```
        npx create-react-app myapp
        ```
    --template redux (state yönetimi ve dosya yapısı hazır bir redux template i eklemek için)
         ```
        npx --template redux
         ```
    bootstarp (css için)
         ```
       npm i bootstrap
         ```
    react-toastify (bildirimleri göstermek için)
         ```
      npm i react-toastify
         ```
    react-router-dom (yönlendirmeler için )
         ```
      npm i react-router-dom
         ```
    axios (apiden veriyi çekip kullanmak için)
         ```
      npm i axios
         ```

database:
    mongoDB

