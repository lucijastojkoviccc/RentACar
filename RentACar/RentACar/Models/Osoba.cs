using RentACar.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentACar.Models;

public abstract class Osoba
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Ime")]
    public string? Ime { get; set; }
  
    public string? Kontakt { get; set; }

    public bool? IsOwner { get; set; }

    public string? Username { get; set; }
    public string? Password { get; set; }

    public List<Komentar>? Komentari { get; set; }

}
