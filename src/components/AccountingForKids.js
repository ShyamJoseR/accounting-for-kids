import React, { useState } from 'react';
import { Button, Input, Card, CardContent, CardHeader } from '../components/ui/card';
import { ArrowRight, DollarSign, Frown, Smile } from 'lucide-react';

const AccountingForKids = () => {
  const [step, setStep] = useState(1);
  const [balance, setBalance] = useState({ ones: 0, tens: 0, hundreds: 0, thousands: 0 });
  const [toyPrice, setToyPrice] = useState(0);
  const [result, setResult] = useState(null);

  const calculateTotal = (bal) => {
    return bal.ones + bal.tens * 10 + bal.hundreds * 100 + bal.thousands * 1000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCalculate = () => {
    const total = calculateTotal(balance);
    if (toyPrice <= total) {
      const remaining = total - toyPrice;
      setResult({
        canBuy: true,
        remaining: {
          thousands: Math.floor(remaining / 1000),
          hundreds: Math.floor((remaining % 1000) / 100),
          tens: Math.floor((remaining % 100) / 10),
          ones: remaining % 10
        }
      });
    } else {
      const needed = toyPrice - total;
      setResult({
        canBuy: false,
        needed: {
          thousands: Math.floor(needed / 1000),
          hundreds: Math.floor((needed % 1000) / 100),
          tens: Math.floor((needed % 100) / 10),
          ones: needed % 10
        }
      });
    }
  };

  const MoneyInput = ({ label, value, onChange }) => (
    <div className="flex items-center mb-4">
      <label className="w-20">{label}:</label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min={0}
        className="w-20 ml-2"
      />
      <DollarSign className="ml-2" size={24} />
    </div>
  );

  const MoneyDisplay = ({ amount, label }) => (
    <Card className="w-1/4 mx-2">
      <CardHeader className="text-center font-bold">{label}</CardHeader>
      <CardContent className="text-center text-2xl">{amount}</CardContent>
    </Card>
  );

  if (step === 1) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <CardHeader className="text-2xl font-bold text-center mb-4">
          Let's Count Your Money!
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <MoneyInput label="1s" value={balance.ones} onChange={(v) => setBalance({ ...balance, ones: v })} />
            <MoneyInput label="10s" value={balance.tens} onChange={(v) => setBalance({ ...balance, tens: v })} />
            <MoneyInput label="100s" value={balance.hundreds} onChange={(v) => setBalance({ ...balance, hundreds: v })} />
            <MoneyInput label="1000s" value={balance.thousands} onChange={(v) => setBalance({ ...balance, thousands: v })} />
            <Button type="submit" className="w-full mt-4">
              Next <ArrowRight className="ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <CardHeader className="text-2xl font-bold text-center mb-4">
        Your Money Box
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          <MoneyDisplay amount={balance.ones} label="1s" />
          <MoneyDisplay amount={balance.tens} label="10s" />
          <MoneyDisplay amount={balance.hundreds} label="100s" />
          <MoneyDisplay amount={balance.thousands} label="1000s" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">How much does your toy cost?</label>
          <Input
            type="number"
            value={toyPrice}
            onChange={(e) => setToyPrice(parseInt(e.target.value) || 0)}
            min={0}
            className="w-full"
          />
        </div>
        <Button onClick={handleCalculate} className="w-full mb-4">
          Can I Buy It?
        </Button>
        {result && (
          <div className={`p-4 rounded-lg ${result.canBuy ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.canBuy ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Smile className="mr-2 text-green-500" size={32} />
                  <span className="text-xl font-bold">Yes, you can buy the toy!</span>
                </div>
                <p className="text-center mb-4">You'll have this much left:</p>
                <div className="flex justify-between">
                  <MoneyDisplay amount={result.remaining.ones} label="1s" />
                  <MoneyDisplay amount={result.remaining.tens} label="10s" />
                  <MoneyDisplay amount={result.remaining.hundreds} label="100s" />
                  <MoneyDisplay amount={result.remaining.thousands} label="1000s" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Frown className="mr-2 text-red-500" size={32} />
                  <span className="text-xl font-bold">Not enough money yet!</span>
                </div>
                <p className="text-center mb-4">You need this much more:</p>
                <div className="flex justify-between">
                  <MoneyDisplay amount={result.needed.ones} label="1s" />
                  <MoneyDisplay amount={result.needed.tens} label="10s" />
                  <MoneyDisplay amount={result.needed.hundreds} label="100s" />
                  <MoneyDisplay amount={result.needed.thousands} label="1000s" />
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountingForKids;