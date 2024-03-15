using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentACar.Models;

public class Komentar
{

    [BsonElement("Text")]
    public string Text { get; set; }

    public int Ocena { get; set; }

    public string ImeOsobe { get; set; }

}
