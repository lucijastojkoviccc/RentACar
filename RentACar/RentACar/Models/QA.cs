using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentACar.Models;

public class QA
{

    [BsonElement("Pitanje")]
    public string Pitanje { get; set; }


    [BsonElement("Odgovor")]
    public string Odgovor { get; set; }

}
