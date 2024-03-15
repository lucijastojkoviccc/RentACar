using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace RentACar.Models
{
    public class Rezervacija
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Ime { get; set; }       
        public string? Email { get; set; }
        public int BrojDana { get; set; }
        public decimal UkupnaCena { get; set; }
        public DateTime DatumOd { get; set; }
        public DateTime DatumDo { get; set;}
        public string? AutoID { get; set; } 

    }
}
