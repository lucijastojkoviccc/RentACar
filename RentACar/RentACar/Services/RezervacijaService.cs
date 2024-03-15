using RentACar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace RentACar.Services;

    public class RezervacijaService
    {
    private readonly IMongoCollection<Rezervacija> _rezervacijaCollection;
        public RezervacijaService(IOptions<DatabaseSettings> DatabaseSettings) 
        {
            var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);

            _rezervacijaCollection = mongoDatabase.GetCollection<Rezervacija>(
                DatabaseSettings.Value.RezervacijeCollectionName);
        }
        public IMongoCollection<Rezervacija> Collection { get { return _rezervacijaCollection; } }

        public async Task<List<Rezervacija>> GetAsync() =>
            await _rezervacijaCollection.Find(_ => true).ToListAsync();

        public async Task<Rezervacija> GetAsync(string id) =>
            await _rezervacijaCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Rezervacija novaRezervacija) =>
            await _rezervacijaCollection.InsertOneAsync(novaRezervacija);

        public async Task UpdateAsync(string id, Rezervacija updatedRezervacija) =>
            await _rezervacijaCollection.ReplaceOneAsync(x => x.Id == id, updatedRezervacija);

        public async Task RemoveAsync(string id) =>
            await _rezervacijaCollection.DeleteOneAsync(x => x.Id == id);


}

