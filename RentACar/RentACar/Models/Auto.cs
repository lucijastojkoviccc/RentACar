using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentACar.Models;

public class Auto
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Naziv")] //pun naziv koji sadrzi marku i model 
    public string Naziv { get; set; }

    public string? Opis { get; set; }

    public string Boja { get; set; }

    public string Grad {  get; set; }

    public string Adresa { get; set; }

    public List<String>? Slike { get; set; }

   public int BrojSedista { get; set; }    
    
    public decimal CenaPoDanu { get; set; }

    public bool PogodanZaInvalide { get; set; } = false;

    public bool Automatic { get; set; } = false; 

    public List<QA>? QAs { get; set; }
    public Vlasnik? Vlasnik { get; set; }

    public List<Rezervacija>? ListaRezervacija { get; set; }
}
