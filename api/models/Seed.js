const Talent = require('./talent');
const mongoose = require('mongoose');
const moment = require('moment');
require('dotenv').config();




    const Seed =  () => {   
        let mongol_url = process.env.NODE_ENV == 'test' ? process.env.MONGO_URL_TEST :process.env.MONGO_URL;

        mongoose.connect('mongodb://danielkmx:database123@ds237955.mlab.com:37955/desafio_node',{ useNewUrlParser: true });
        const talent = new Talent({
            _id: new mongoose.Types.ObjectId(),
            Name: 'Fernando',
            Email: 'fernando@email.com',
            PhoneNumber: '55989321999',
            Linkedin: 'linkedin/fernando',
            State: 'SP',
            City: 'SP',
            Portfolio: 'www.portifolio.com',
            WillignessToWork: 'Up to 4 hours per day / Até 4 horas por dia',
            BestTimeToWork: 'Morning (from 08:00 to 12:00) / Manhã (de 08:00 ás 12:00)',
            SalaryRequirementPerHour: '30',
            RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')
            
        });
        const talent2 = new Talent({
            _id: new mongoose.Types.ObjectId(),
            Name: 'Bruno',
            Email: 'bruno@email.com',
            PhoneNumber: '55219703140',
            Linkedin: 'linkedin/bruno',
            State: 'SP',
            City: 'SP',
            Portfolio: 'www.portifolio.com',
            WillignessToWork: '4 to 6 hours per day / De 4 á 6 horas por dia',
            BestTimeToWork: 'Afternoon (from 1:00 p.m. to 6:00 p.m.) / Tarde (de 13:00 ás 18:00)',
            SalaryRequirementPerHour: '40',
            RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')
            
        });
         talent.save();
         talent2.save();

        console.log('database seeded');
    
    }
  Seed();