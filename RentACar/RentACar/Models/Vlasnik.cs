using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RentACar.Models
{
    public class Vlasnik : Osoba
    {
        public List<string>? AutoIds { get; set; }
        public string? Kompanija { get; set; }
        //public bool IsOwner { get; set; }
        
    }
}
