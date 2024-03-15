using RentACar.Models;
using RentACar.Services;
using MongoDB.Driver;
using MongoDB.Bson;


//namespace RentACar;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>

{

    options.AddPolicy("CORS",

                    policy =>

                    {

                        policy.WithOrigins("http://localhost:5500",

                                    "https://localhost:3001",

                                    "https://localhost:5500",

                                    "https://127.0.0.1:5500",

                                    "http://localhost:3001",

                                    "http://localhost:5100",

                                    "https://localhost:5100",

                                    "https://127.0.0.1:5100")

                                    .AllowAnyHeader()

                        .AllowAnyMethod()

                        .AllowCredentials();

                        // policy.AllowAnyOrigin();

                        // policy.AllowAnyHeader();

                    });

});

// Add services to the container.

builder.Services.Configure<DatabaseSettings>(

                builder.Configuration.GetSection("CarDB"));
//const string connectionUri = "mongodb+srv://rentacar:<rentacar>@car.etfx2qz.mongodb.net/?retryWrites=true&w=majority";
//var settings = MongoClientSettings.FromConnectionString(connectionUri);
//// Set the ServerApi field of the settings object to set the version of the Stable API on the client
//settings.ServerApi = new ServerApi(ServerApiVersion.V1);
//// Create a new client and connect to the server
//var client = new MongoClient(settings);
//// Send a ping to confirm a successful connection
//try
//{
//    var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
//    Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
//}
//catch (Exception ex)
//{
//    Console.WriteLine(ex);
//}

builder.Services.AddSingleton<AutoService>();

builder.Services.AddSingleton<VlasnikService>();

builder.Services.AddSingleton<KlijentService>();

builder.Services.AddSingleton<RezervacijaService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("CORS");

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())

{

    app.UseSwagger();

    app.UseSwaggerUI();

}

app.UseAuthorization();


app.MapControllers();

app.Run();

