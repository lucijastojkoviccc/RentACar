using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace RentACar.Models;

public class Klijent : Osoba
{
    public bool ImaInvaliditet { get; set; }
}
