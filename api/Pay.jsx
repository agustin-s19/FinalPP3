const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "TEST-598bca96-c6e4-4d19-97d1-fddaa9de03b0"
})


const Pay = () =>{
    return (
        <div
         style={{
             height:"100vh",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
         }}
        >

        <button
        style={{
         border: "none",
         width: 120,
         borderRadius: 5,
         padding: "20px",
         backgroundColor: "black",
         color: "white",
         fontWeight: "600",
         cursor: "pointer"
        }}
>           
        Paga Wacho
        </button>
    </div>
    )
}