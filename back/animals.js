class Animals {
  constructor(
    AnimalID,
    Name,
    DateofBirth,
    Weight,
    OwnerID,
    SpeciesID,
    Vaccinated
  ) {
    this.AnimalID = AnimalID;
    this.Name = Name;
    this.DateofBirth = DateofBirth;
    this.Weight = Weight;
    this.OwnerID = OwnerID;
    this.SpeciesID = SpeciesID;
    this.Vaccinated = Vaccinated;
  }
}

module.exports = Animals;
